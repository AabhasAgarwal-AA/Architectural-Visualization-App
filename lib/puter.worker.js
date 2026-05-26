
const PROJECT_PREFIX = "roomie_project_";

router.post("/api/projects/save", async ({ request, user }) => {
    try {
        const userPuter = user.puter; 
        if(!userPuter){
            return JSONError(401, "Auth failed");
        }

        const bosy = await request.json();
        const project = body?.project;

        if(!project?.id || !project?.sourceImage){
            return JSONError(400, "Project ID and source image both are required");
        }

        const payload = {
            ...project, 
            updateAt: new Date().toString(), 
        }

        const userId = await getUserId(userPuter);
        if(!userId){
            return JSONError(401, "Auth failed");
        }

        const key = `${PROJECT_PREFIX}${project.id}`;
        await userPuter.kv.set(key, payload);

        return {
            saved: true, 
            id: project.id, 
            project: payload 
        }

    } catch (error){
        return JSONError(500, "Failed to save project", {message: error.message || "Unknown Error"});
    }
});

router.get('/api/projects/list', async ({ user }) => {
    try {
        const userPuter = user.puter;
        if (!userPuter) {
            return jsonError(401, 'Authentication failed');
        }

        const userId = await getUserId(userPuter);
        if (!userId) {
            return jsonError(401, 'Authentication failed');
        }

        const projects = (await userPuter.kv.list(PROJECT_PREFIX, true))
            .map(({ value }) => ({ ...value, isPublic: true }))

        return { 
            projects 
        };
    } catch (error) {
        return jsonError(500, 'Failed to list projects', { message: error.message || 'Unknown error' });
    }
});

router.get('/api/projects/get', async ({ request, user }) => {
    try {
        const userPuter = user.puter;
        if (!userPuter) { 
            return jsonError(401, 'Authentication failed');
        }

        const userId = await getUserId(userPuter);
        if (!userId) {
            return jsonError(401, 'Authentication failed');
        }

        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return jsonError(400, 'Project ID is required');
        }

        const key = `${PROJECT_PREFIX}${id}`;
        const project = await userPuter.kv.get(key);

        if (!project) {
            return jsonError(404, 'Project not found');
        }

        return { 
            project 
        };
    } catch (error) {
        return jsonError(500, 'Failed to get project', { message: error.message || 'Unknown error' });
    }
});

const JSONError = (status, message, exta = {}) => {
    new Response(JSON.stringify({error: message, ...extra}), {
        status, 
        headers: {
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": "*"

        }
    })
};

const getUserId = async (userPuter) => {
    try {
        const user = await userPuter.auth.getUserId();
        return user?.uuid || null;  
    } catch (error){
        return null; 
    }
}

