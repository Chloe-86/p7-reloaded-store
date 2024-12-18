export function addActiveFilterModel(wrapper, text) {
  return wrapper.appendChild(text);
}

export function removeActiveFilterModel(wrapper, elt) {
  return wrapper.remove(elt);
}

export function removeBtn(wrapper, text) {
  const elementToRemove = wrapper.closest(text);
  if (elementToRemove) {
    elementToRemove.remove();
  }
}

export function findGrandPa(target) {
  const grandPaElt = target.parentNode.parentNode;
  return grandPaElt;
}

export function inputSanitize(query) {
  return query
    .replace(
      /['"<>\\]/g,
      (match) =>
        ({
          "'": "\\'",
          '"': '\\"',
          "<": "&lt;",
          ">": "&gt;",
          "\\": "\\\\",
        }[match])
    )
    .trim()
    .toLowerCase();
}
