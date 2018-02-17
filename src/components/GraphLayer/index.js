import styled from 'styled-components';

const GraphLayer = styled.g`
   transform: translate(
     ${props => props.left || 0}px, ${props => props.top || 0}px
   );
`;

export default GraphLayer;