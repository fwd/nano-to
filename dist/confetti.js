/**
 * Lightweight confetti generator - replaces ~4000 lines of static CSS
 * Creates confetti elements dynamically on demand
 */
(function() {
  var colors = ['#ffbf00', '#ff4040', '#4dc9f6', '#f67019', '#f53794', '#537bc4', '#acc236', '#166a8f', '#00a950', '#58595b'];
  var style = document.createElement('style');
  style.textContent = '[class|=confetti]{position:fixed;z-index:99999;zoom:1.3;pointer-events:none}';
  document.head.appendChild(style);

  window.createConfetti = function(count) {
    count = count || 150;
    var container = document.getElementById('confetti-container');
    if (container) container.remove();
    container = document.createElement('div');
    container.id = 'confetti-container';
    document.body.appendChild(container);

    var css = '';
    for (var i = 0; i < count; i++) {
      var el = document.createElement('div');
      el.className = 'confetti-' + i;
      container.appendChild(el);

      var w = 4 + Math.random() * 8;
      var h = w * 0.4;
      var color = colors[i % colors.length];
      var left = Math.random() * 100;
      var opacity = 0.7 + Math.random() * 0.7;
      var rotation = Math.random() * 360;
      var duration = 3 + Math.random() * 3;
      var delay = Math.random() * 3;

      css += '.confetti-' + i + '{' +
        'width:' + w + 'px;' +
        'height:' + h + 'px;' +
        'background-color:' + color + ';' +
        'top:-10%;' +
        'left:' + left + '%;' +
        'opacity:' + opacity + ';' +
        'transform:rotate(' + rotation + 'deg);' +
        'animation:drop-' + i + ' ' + duration + 's ' + delay + 's infinite}' +
        '@keyframes drop-' + i + '{100%{top:110%;left:' + (left + (Math.random() * 15 - 7.5)) + '%}}';
    }

    var dynamicStyle = document.getElementById('confetti-styles');
    if (dynamicStyle) dynamicStyle.remove();
    dynamicStyle = document.createElement('style');
    dynamicStyle.id = 'confetti-styles';
    dynamicStyle.textContent = css;
    document.head.appendChild(dynamicStyle);
  };

  window.removeConfetti = function() {
    var container = document.getElementById('confetti-container');
    if (container) container.remove();
    var styles = document.getElementById('confetti-styles');
    if (styles) styles.remove();
  };
})();
