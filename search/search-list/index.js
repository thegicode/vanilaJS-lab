import SearchList from "./SearchList.js";

customElements.define("search-list", SearchList, { extends: "div" });

/** actions **/

// Selectors
const $Form = document.querySelector(".header");
const $List = document.querySelector(".search-list");
const $input = $Form.querySelector("input");

// Events
$Form.addEventListener("submit", (event) => {
  event.preventDefault();
  if ($List.selected) {
    $List.selected.querySelector("a").click();
  }
});

$Form.addEventListener("reset", (event) => {
  $List.selected = undefined;
  $List.hidden = true;
});

$input.addEventListener("input", (event) => {
  $List.onInput($input.value);
});

// $input.addEventListener('focus', event => {
//     $Form.dataset.focus = true
//     if ($input.validity.valid === true) {
//         $List.onInput($input.value)
//     }
// })

// $input.addEventListener("focusout", (event) => {
//   $Form.dataset.focus = false;
//   if ($List.isItemOver === false) {
//     $List.hidden = true;
//   }
// });

$input.addEventListener("keydown", (event) => {
  const keyCode = event.keyCode;
  if (keyCode === 38 || keyCode === 40) {
    $List.onKeydown(keyCode);
  }
});

window.addEventListener("onItemClick", (event) => {
  $input.value = "";
});
