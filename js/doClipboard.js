// some browsers submit forms on any button click
$('.clipboard-btn').click(function (e) {
  e.preventDefault();
});

var clipboard = new Clipboard('.clipboard-btn'); // initialize Clipboard.js

var tooltip;

clipboard.on('success', function (e) {
  e.clearSelection();
  if (tooltip) {
    tooltip.hide();
    tooltip.destroy();
  }

  tooltip = new HTML5TooltipUIComponent();
  tooltip.set({
    animateFunction: 'fadein',
    color: 'bamboo',
    contentText: 'Copied!',
    stickTo: 'bottom',
    target: e.trigger,
  });

  tooltip.mount();
  tooltip.show();

  e.trigger.addEventListener('mouseleave', function () {
    if (tooltip) {
      tooltip.hide();
      tooltip = null;
    }
  });
});
