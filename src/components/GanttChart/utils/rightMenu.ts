// import { useDefaultValue } from "../state/index";
// const { menuVisible, setMenuVisible, setEditBlock, setEditRow, setCurrentRow } =
//   useDefaultValue();
// /**
//  *
//  * @param event
//  * @param row
//  * @param block
//  */
// export const onRightClick = (event: any, row: any, block: any) => {
//   if (!menuVisible) {
//     return;
//   }
//   //编辑需要把时间长度先计算好
//   block.timeDiff = (block.endTime - block.startTime) / 3600000;
//   setEditRow(row);
//   setEditBlock(block);

//   setMenuVisible(false); // 先把模态框关死，目的是 第二次或者第n次右键鼠标的时候 它默认的是true
//   setMenuVisible(true); // 显示模态窗口，跳出自定义菜单栏
//   event.preventDefault(); //关闭浏览器右键默认事件
//   setCurrentRow(row);
//   const menu = document.querySelector(".menu");
//   styleMenu(menu, event);
// };
// const styleMenu = (menu: any, event: MouseEvent) => {
//   document.addEventListener("click", cancelMouse); // 给整个document新增监听鼠标事件，点击任何位置执行foo方法
//   menu.style.left = `${Math.min(event.clientX, window.innerWidth - 120)}px`;
//   menu.style.top = `${Math.min(event.clientY, window.innerHeight - 80)}px`;
// };
// const cancelMouse = () => {
//   // 取消鼠标监听事件 菜单栏
//   setMenuVisible(false);
//   document.removeEventListener("click", cancelMouse);
// };
