await db.collection("startups").add({

    uid: req.user.uid,

    prompt,

    startupData: result,

    createdAt: new Date()

});