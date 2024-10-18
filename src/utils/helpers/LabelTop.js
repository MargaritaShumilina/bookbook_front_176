export const labelTop = (
  inputSelector,
  classToLabel,
  forAndIdToLabel,
  labelText,
  placeholderText,
  classToDeleteBtn,
) => {
  let label;
  let deleteButton;

  if (inputSelector) {
    inputSelector.addEventListener("focus", () => {
      // Создаем label, если он еще не существует
      if (!label) {
        label = document.createElement("label");
        label.setAttribute("for", forAndIdToLabel);
        label.textContent = labelText;
        label.classList.add(classToLabel);
        inputSelector.parentNode.insertBefore(label, inputSelector);
      }

      // Создаем deleteButton, если он еще не существует
      if (!deleteButton) {
        deleteButton = document.createElement("div");
        deleteButton.classList.add(classToDeleteBtn);
        inputSelector.parentNode.insertBefore(deleteButton, inputSelector);

        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();
          inputSelector.value = "";
          if (label) {
            label.remove();
            label = null;
          }
          if (deleteButton) {
            deleteButton.remove();
            deleteButton = null;
          }
        });
      }

      inputSelector.setAttribute("placeholder", "");
    });

    inputSelector.setAttribute("id", forAndIdToLabel);
    inputSelector.setAttribute("autocomplete", "off");
    inputSelector.value = "";

    inputSelector.addEventListener("blur", () => {
      setTimeout(() => {
        if (label) {
          label.remove(); // Удаляем label
          label = null;
        }
        if (deleteButton) {
          deleteButton.remove(); // Удаляем кнопку
          deleteButton = null;
        }
        inputSelector.setAttribute("placeholder", placeholderText);
      }, 200);
    });
  }
};
