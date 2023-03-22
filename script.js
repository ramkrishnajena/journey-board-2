const title = document.getElementById("title");
const taskDesc = document.getElementById("task_description");
const taskBoxList = document.getElementById("task-list");
const boxContent = document.getElementById("box-content");
const notification = document.getElementById("notification");
const notificatioNum = document.querySelector(".notification__count");
const notificationList = document.querySelector(".notification-list");
const closeNotification = document.getElementById("close");

const url =
  "https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project.json";

const callAPi = async (url) => {
  try {
    const fetchData = await fetch("./deepthoughts.json");
    const data = await fetchData.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
callAPi(url);

const boxElement = `<div class="content__heading">
<span><img src="./assets/up-arrow.svg" alt="up-arrow" /></span>
<p>Thread A</p>
</div>
<div class="content__form">
<div class="form-one">
  <p>Sub thread1</p>
  <input type="text" name="thread-one" />
</div>
<div class="form-two">
  <p>Sub thread2</p>
  <input type="text" name="thread-two" />
</div>
</div>
<div class="content__bar">
<ul>
  <li><img src="./assets/buld.svg" /></li>
  <li><img src="./assets/message.svg" /></li>
  <li><img src="./assets/question.svg" /></li>
  <li><img src="./assets/flower.svg" /></li>
</ul>
<div class="select-option">
  <select id="details" name="contact">
    <option>Select Category</option>
  </select>
  <select id="details" name="contact">
    <option>Select Process</option>
  </select>
</div>
</div>
<div class="sub-thread">
<button><span>+</span>Sub-thread</button>
<div class="sub-form">
<p>Summary of Thread A</p>
<input type="text" name="summary" placeholder="Enter Text Here"/>
</div>
</div>
`;
const editorElement = `<div class="editor-title">
<p>Title</p>
<input type="text" name="title" />
</div>
<div class="editor-content-box">
<p>Content</p>
                    <div class="content-edit-options">
                      <p>File</p>
                      <p>Edit</p>
                      <p>View</p>
                      <p>Insert</p>
                      <p>Format</p>
                      <p>Tools</p>
                      <p>Table</p>
                      <p>Help</p>
                      <p>
                        <img src="./assets/undo.svg" />
                      </p>
                      <p>
                        <img src="./assets/redo.svg" />
                      </p>
                      <p>
                        <img src="./assets/expand.svg" />
                      </p>
                      <p>paragraph</p>
                      <p class="more">...</p>
                    </div>
                    <input type="text" name="content" />
</div>
`;

const insertData = async () => {
  const apiData = await callAPi();
  const taskHead = apiData?.tasks[0];
  const bodyData = taskHead?.assets;
  title.innerText = apiData?.title;

  //   task__title and task__desc set
  taskDesc.innerHTML = taskTitle(taskHead);
  taskBoxList.innerHTML = taskThread(bodyData).join("");
  let li = `<li>${taskHead.task_title}</li>`;
  notification.addEventListener("click", () => {
    notification.classList.add("notification-on");
    notificatioNum.classList.add("none");
    notificationList.innerHTML = `<ul class="notification-ul">${li}</ul>`;
  });
  for (const list of bodyData) {
    li += `<li>${list.asset_title}</li>`;
  }
  console.log(closeNotification);
  closeNotification.addEventListener("click", () => {
    notification.classList.remove("notification-on");
    notificatioNum.classList.remove("none");
    notificationList.innerHTML = `<p id="notification__count">1</p>`;
  });
};
insertData();

const taskTitle = ({ task_title, task_description }) => {
  return `<p>${task_title}</p> <p>${task_description}</p>`;
};

const taskThread = (tasks) => {
  let taskHtml = tasks.map((data, index) => {
    return `<div class="task-box box${index}">
    <div class="task-box__head">
      <p>${data.asset_title}</p>
      <span><p>i</p></span>
    </div>
    <div class="task-box__desc"><span>Description:</span>
    <p>${data.asset_description}</p></div>
    <div class="task-box__content" id="box-content">
    ${
      data.asset_type === "display_asset"
        ? `<iframe src=${data.asset_content} width="100%"></iframe>`
        : ""
    }
    ${data.asset_title === "Threadbuild" ? boxElement : ""}
    ${data.asset_title === "Structure you pointers " ? editorElement : ""}
    
    </div>
  </div>`;
  });

  return taskHtml;
};
