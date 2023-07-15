let url = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'

let ksData

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawTreeMap = () => {
  
  let hierarchy = d3.hierarchy(ksData, (node) => {
    return node['children']
  }).sum((node) => {
    return node['value']
  }).sort((node1, node2) => {
    return node2['value'] - node1['value']
  })
  
  let createTreeMap = d3.treemap()
                        .size([800, 600])
  
  createTreeMap(hierarchy)
  
  let tiles = hierarchy.leaves()
  
  let block = canvas.selectAll('g')
        .data(tiles)
        .enter()
        .append('g')
        .attr('transform', (item) => {
                return 'translate(' + item['x0'] + ', ' + item['y0'] + ')'
            })
  block.append('rect')
        .attr('class', 'tile')
        .attr('fill', (item) => {
        let category = item['data']['category']
          if(category === 'Product Design'){
            return 'pink'
          } else if(category === 'Tabletop Games'){
            return 'blue'
          } else if(category === 'Video Games'){
            return 'orange'
          }else if(category === 'Technology'){
            return 'red'
          } else if(category === 'Wearables'){
            return 'green'
          } else if(category === 'Food'){
            return 'coral'
          } else if(category === 'Apparel'){
            return 'lightgreen'
          } else if(category === 'Gadgets'){
            return 'yellow'
          } else if(category === 'Drinks'){
            return 'purple'
          } else if(category === 'Art'){
            return 'brown'
          } else if(category === '3D Printing'){
            return 'indigo'
          } else if(category === 'Hardware'){
            return 'khaki'
          } else if(category === 'Web'){
            return 'lightblue'
          } else if(category === 'Sound'){
            return 'darkorange'
          } else if(category === 'Television'){
            return 'darkseagreen'
          } else if(category === 'Games'){
            return 'mediumorchid'
          } else if(category === 'Gaming Hardware'){
            return 'lightsalmon'
          } else if(category === 'Sculpture'){
            return 'white'
          } else if(category === 'Narrative Film'){
            return 'grey'
          }
  }).attr('data-name', (item) => {
    return item['data']['name']
  }).attr('data-category', (item) => {
    return item['data']['category']
  }).attr('data-value', (item) => {
    return item['data']['value']
}).attr('width', (item) => {
                return item['x1'] - item['x0']
            })
            .attr('height', (item) => {
                return item['y1'] - item['y0']
            }).on('mouseover', (item) => {
                tooltip.transition()
                        .style('visibility', 'visible')

      

                tooltip.attr('data-value', item['data']['value'])
            })
            .on('mouseout', (item) => {
                tooltip.transition()
                        .style('visibility', 'hidden')
            })
  
  block.append('text')
            .text((movie) => {
                return movie['data']['name']
            })
            .attr('x', 5)
            .attr('y', 20)
}


d3.json(url).then(
(data, error) => {
  if(error){
    console.log(error)
  } else {
    ksData = data
    console.log(ksData)
    drawTreeMap()
    }
  }
)
