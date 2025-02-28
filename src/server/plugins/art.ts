const art = `
<!--
 ╱|、
(˚ˎ 。7  
|、˜〵          
じしˍ,)ノ
b-xth-s

"""
I want a perfect body, I want a perfect soul.
I want you to notice when I'm not around.
So fuckin' special, I wish I was special.
But I'm a creep, I'm a weirdo.
What the hell am I doing here?
I don't belong here.
"""

I'm not okay :(
-->
`;

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.bodyAppend.push(art);
  });
});
