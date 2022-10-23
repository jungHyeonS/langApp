import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-web';
import styled from 'styled-components/native';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`


const Box = styled.TouchableOpacity`
background-color: tomato;
width: 200px;
height: 200px;
`


export default function App() {
  const [y,setY] = useState(0);
  const [inservalId,setIntervalId] = useState(null);
  const moveUp = () => {
    const id = setInterval(()=>{
      setY(prev => prev + 1)
    },10)
    setIntervalId(id);
    // setY(-200)
  }
  useEffect(()=>{
    if(y === 200){
      clearInterval(inservalId);
    }
  },[y,inservalId])
  return (
    <Container>
      <Box onPress={moveUp} style={{
        transform : [{translateY:y}]
      }}/>
    </Container>
  );
}


