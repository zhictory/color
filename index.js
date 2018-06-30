const colorNode = document.querySelector('#j_color');

~(function () {

  const color = window.color;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < color.length; i++) {
    const li = document.createElement('li');
    const text = document.createTextNode(color[i]['name']);
    li.setAttribute('class', 'color__item');
    li.style.backgroundColor = color[i]['value'];
    li.appendChild(text);
    fragment.appendChild(li);
  }

  colorNode.appendChild(fragment);

})();

~(function () {

  const tips = document.createElement('div');
  const tipsText = document.createTextNode('已复制');
  tips.classList.add('color__tips');
  tips.appendChild(tipsText);
  let timeId;

  colorNode.querySelectorAll('.color__item').forEach((item)=>{

    item.addEventListener('click', (e) => {
  
      e.stopPropagation();
  
      const input = document.createElement('input');
      input.classList.add('color__input');
      input.value = hex(e.currentTarget.style.backgroundColor);
      e.currentTarget.appendChild(input);
  
      input.focus();
      input.setSelectionRange(0, input.value.length);
      document.execCommand('copy', true);
      input.remove();
  
    });
  
  
    item.addEventListener('mouseup', (e) => {
  
      e.stopPropagation();
  
      if (timeId) {
        clearTimeout(timeId);
      }
      
      e.currentTarget.appendChild(tips);
      timeId = setTimeout(()=>{
        tips.remove();
      }, 1000);
  
    });

  });
  

})();

/**
 * RGB 转换为 HEX
 * @param {String} c RGB 颜色值 
 */
function hex(c) {

  var m = /rgba?\((\d+), (\d+), (\d+)/.exec(c);
  return m ? '#' + (m[1] << 16 | m[2] << 8 | m[3]).toString(16) : c;

}

