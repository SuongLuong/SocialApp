const { db } = require("../util/admin");

exports.getAllScreams = (request, response) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          sceramId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createAt: doc.data().createAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount
        });
      });
      return response.json(screams);
    })
    .catch(err => {
      console.error(err);
      response.status(500).json({ error: err.code });
    });
};

exports.postOneScream = (request, response) => {
  if (request.body.body.trim() === "") {
    return response.status(400).json({ body: "Body must not be empty" });
  }
  const newScream = {
    body: request.body.body,
    userHandle: request.user.handle,
    createAt: new Date().toISOString()
  };

  db.collection("screams")
    .add(newScream)
    .then(doc => {
      response.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      response.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};
