const art = `
<!--
 ╱|、
(˚ˎ 。7  
|、˜〵          
じしˍ,)ノ
b-xth-s

I'm not okay :(
-->
`;

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.bodyAppend.push(art);
  });
});
