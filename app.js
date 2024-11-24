                                        

const chatList = [];

let user = "";

document.getElementById("selectUser").addEventListener("change", function () {
  user = this.value;
  console.log(this.value);
});
function sendMassage() {
  let txtUserInput = document.getElementById("txtUserInput").value;
  let chatBubble = ` <div class="d-flex justify-content-end mx-2 p-3"><h3 class="text-end bg-success text-white rounded-3 p-1">${txtUserInput}</h3></div>`;

    chatList.push(chatBubble);
    loadChatBox();

    console.log("Hello");
  // --------------------------------------------------------------
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "contents": [
      {
        "parts": [
          {
            "text": txtUserInput
          }
        ]
      }
    ]
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };
  fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAHQa9MQqxuYVvMoptP7E2vgvjuhwyUXa0", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      
      console.log(result.candidates[0].content.parts[0].text);
      chatBubble=`<div class="p-3 d-inline-flex  "><h3 class="text-start bg-secondary text-white rounded-3 p-2">${result.candidates[0].content.parts[0].text}</h3></div>`;
      chatList.push(chatBubble);
      loadChatBox();
    })
    .catch((error) => console.error(error));
  // --------------------------------------------------------------
  loadChatBox();
}
function loadChatBox() {
  document.getElementById("chatBox").innerHTML = "";
  chatList.forEach(element => {
    document.getElementById("chatBox").innerHTML += element;
  })
}

// ----------------------------------------------------------------------


