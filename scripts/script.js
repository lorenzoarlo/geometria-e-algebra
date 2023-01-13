window.addEventListener("DOMContentLoaded", function() {
    
    const searchbar = document.querySelector("#searchbar");
    const index_container = document.querySelector(".index-container");
    
    const main_leaf = index_container.querySelector("ul");    
    const tree = get_tree(main_leaf);
    console.log(tree);
    const search_action = function() 
    {
        const value = searchbar.value.toLowerCase();
        visit_all(tree, value);      
    }
    
    searchbar.addEventListener("input", search_action);



});

function get_tree(node) 
{
    const tmp = {"object": node, "a-object": node.querySelector("a"), "content": "", "children": []};
    
    if(node.tagName !== 'UL') tmp.content = tmp['a-object'].innerText.replaceAll("\n", "");
    const children = Array.from(node.children);
    for(let c of children) 
    {
        if(['UL', 'LI'].includes(c.tagName)) 
        {
            tmp["children"].push(get_tree(c))
        }
    }


    return tmp;
}

function visit_all(tree, value) 
{
    let result = false;
    let saturation = false;
    for(let c of tree['children']) 
    {
        result = visit_all(c, value);
        saturation = c['content'].toLowerCase().indexOf(value) !== -1;
        result = result || saturation;
        (result) ? c['object'].classList.remove("hyde") : c['object'].classList.add("hyde");
        (saturation) ? c['object'].classList.remove("desaturate") : c['object'].classList.add("desaturate");
        (saturation) ? c['a-object'].classList.remove("desaturate") : c['a-object'].classList.add("desaturate");

    }
    return result;
} 