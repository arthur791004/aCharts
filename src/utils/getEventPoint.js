const getPointFromSVG = (svg, point) => {
  if (!svg.createSVGPoint) {
    return;
  }

  const svgPoint = svg.createSVGPoint();

  svgPoint.x = point.x;
  svgPoint.y = point.y;

  return svgPoint.matrixTransform(svg.getScreenCTM().inverse());
}

const getPointFromNode = (node, point) => {
  const { x, y } = point;
  const { clientLeft, clientTop } = node;
  const { left, top } = node.getBoundingClientRect();

  return {
    x: x - left - clientLeft,
    y: y - top - clientTop,
  }
}

const getEventPoint = (event) => {
  const { target, clientX, clientY } = event;

  if (!target) {
    return;
  }

  // find the svg element
  let svg = target.ownerSVGElement;

  while (svg.ownerSVGElement) {
    svg = svg.ownerSVGElement;
  }

  const point = {
    x: clientX,
    y: clientY,
  };

  return getPointFromSVG(svg, point) || getPointFromNode(svg, point);
}

export default getEventPoint;