const searchbar = document.querySelector("#searchbar");
const index_container = document.querySelector(".index-container");

const main_index_leaf = index_container.querySelector("ul");    
const index_tree = get_index_tree(main_index_leaf);

function index_searchaction(event) 
{
    const value = event.srcElement.value.toLowerCase();
    visit_index_all(index_tree, value);      
}


function get_index_tree(node) 
{
    const tmp = {"object": node, "a-object": node.querySelector("a"), "content": "", "children": []};
    tmp['content'] = tmp['a-object'].innerText.replaceAll("\n", "");
    const children = Array.from(node.children);


    for(let c of children) 
    {
        if('UL' === c.tagName) 
        {
            for(let b of c.children) 
            {
                tmp['children'].push(get_index_tree(b));
            }
        }
        else if ('LI' === c.tagName)
        {
            tmp["children"].push(get_index_tree(c))
        }
    }
    return tmp;
}

function visit_index_all(node, value) 
{
    let saturate = node['content'].toLowerCase().indexOf(value) !== -1;
    let toShow = saturate;
    
    for(let c of node['children']) 
    {
        let child_content = visit_index_all(c, value);

        toShow = toShow || child_content || saturate;
    }


    if(toShow) 
    {
        node['object'].classList.remove("hyde");
        if(saturate) 
        {
            node['a-object'].classList.remove("desaturate");
            node['object'].classList.remove("desaturate");
        }
        else 
        {
            node['a-object'].classList.add("desaturate");
            node['object'].classList.add("desaturate");
        }
    }
    else 
    {
        node['object'].classList.add("hyde");
    }



    return toShow;
    // if(desaturate)
    //     
    // else
    //     node['object'].classList.remove("desaturate");
    
    
    
    // for(let c of node['children']) 
    // {
    //     child_content = visit_all(c, value);
    //     toShow = toShow || child_content || (!desaturate);
    // }
    
    // if(toShow) 
    // else 
    
} 


