class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }
  set room(r) {
    if (r.length > 0) {
      this._room = r;
    } else {
      this._room = "Invalid chatroom!";
    }
  }

  get room() {
    return this._room;
  }

  set username(u) {
    if (u.length > 2 && u.length <= 10 && u !== "") {
      this._username = u;
    } else {
      this._username = alert("Invalid username!");
    }
  }

  get username() {
    return this._username;
  }

  async addChat(mess) {
    let date = new Date();
    let docChat = {
      message: mess,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(date),
    };

    let response = await this.chats.add(docChat); // save to db
    return response;
  }

  async removeChat(id) {
    let response = await this.chats.doc(id).delete();
    return response;
  }

  getChats(callback) {
    this.unsub = this.chats
      .orderBy("created_at")
      .where("room", "==", this.room)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let doc = change.doc;
          let type = change.type;
          if (type == "added") {
            callback(doc);
          }
        });
      });
  }

  updateRoom(updateR) {
    this.room = updateR;
    if (this.unsub) {
      this.unsub();
    }
  }
  updateUsername(newUserName) {
    this.username = newUserName;
    if (this.nUser) {
      this.nUser();
    }
  }
}

export default Chatroom;
