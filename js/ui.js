export class ChatUI {
  constructor(lista) {
    this.lista = lista;
  }

  set lista(l) {
    this._lista = l;
  }

  get lista() {
    return this._lista;
  }

  formTime(data) {
    let todaysDate = new Date();
    let date = data.created_at.toDate();

    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yy = date.getFullYear();
    let hh = date.getHours();
    let minmin = date.getMinutes();

    let todaysdd = todaysDate.getDate();
    let todaysmm = todaysDate.getMonth() + 1;
    let todaysyy = todaysDate.getFullYear();

    let timeItem;

    if (dd === todaysdd && mm === todaysmm && yy === todaysyy) {
      hh = String(hh).padStart(2, "0");
      minmin = String(minmin).padStart(2, "0");
      timeItem = `${hh}:${minmin}`;
    } else {
      dd = String(dd).padStart(2, "0");
      mm = String(mm).padStart(2, "0");
      hh = String(hh).padStart(2, "0");
      minmin = String(minmin).padStart(2, "0");
      timeItem = `${dd}.${mm}.${yy}. - ${hh}:${minmin}`;
    }

    return timeItem;
  }

  templateLi(doc) {
    let data = doc.data();

    let item = `<li id='${doc.id}' class="message-${
      data.username == localStorage.username ? "right" : "left"
    }">
      <span class="username">${data.username}</span>
      <span class="message">${data.message} </span>
      <div class="datetime">${this.formTime(
        data
      )}<ion-icon name="trash-outline" class="delete-icon"></ion-icon></div>
     
    </li>`;
    this.lista.innerHTML += item;
  }

  clearUL() {
    this.lista.innerHTML = "";
  }
}
