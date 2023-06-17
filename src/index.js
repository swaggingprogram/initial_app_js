import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target); //指定したDOMを消す　今回は親のincomplete-listからdeleteTarget(div)を消す
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //divを作る createElementというメソッド
  const div = document.createElement("div");
  div.className = "list-row";
  console.log(div);

  //liを作る liの中にテキストを入れるメソッドは.innerTextという
  const li = document.createElement("li");
  li.innerText = text;
  console.log(li);

  //buttonを追加　完了
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  console.log(completeButton);
  completeButton.addEventListener("click", () => {
    //ボタンを押したらDOMを完了に移す
    const completeTarget = completeButton.parentNode;
    deleteFromIncompleteList(completeTarget);

    const text = completeTarget.firstElementChild.innerText;
    completeTarget.textContent = null; //div配下の全ての要素を取得(textContent) それをnullにして初期化

    const compLi = document.createElement("li");
    compLi.innerText = text;
    completeTarget.appendChild(compLi);

    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    completeTarget.appendChild(backButton);
    backButton.addEventListener("click", () => {
      const deleteTarget = backButton.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      const backText = deleteTarget.firstElementChild.innerText;
      createIncompleteList(backText);
    });

    document.getElementById("complete-list").appendChild(completeTarget);
  });

  //buttonを追加　削除
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  console.log(deleteButton);
  deleteButton.addEventListener("click", () => {
    //ボタンを押したら生成したdivの中身を全て消す
    const deleteTarget = deleteButton.parentNode; //指定したDOMの親要素を取得
    deleteFromIncompleteList(deleteTarget);
  });

  //divタグの子要素に各要素を設定 appendChildは引数で指定したHTMLタグを子要素にしてくれる
  div.appendChild(li);
  //元のDOMと同じにしたいので、divの配下にどんどん追加していく
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
