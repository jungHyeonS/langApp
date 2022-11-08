import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Easing, Pressable, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

// const Box = styled.View`
const Box = styled(Animated.createAnimatedComponent(Pressable))`
background-color: tomato;
width: 200px;
height: 200px;
`
// const AnimatedBox = Animated.createAnimatedComponent(TouchableOpacity);


const {width:SCREEN_WIDTH,height:SCREEN_HEIGHT} = Dimensions.get("window");
export default function App() {
  const POSITION = useRef(new Animated.ValueXY({x:-SCREEN_WIDTH / 2 + 100,y:-SCREEN_HEIGHT / 2 + 100})).current
  const topLeft = Animated.timing(POSITION,{
    toValue:{
      x : -SCREEN_WIDTH / 2 + 100,
      y:-SCREEN_HEIGHT / 2 + 100
    },
    useNativeDriver:false
  })
  const bottomLeft = Animated.timing(POSITION,{
    toValue:{
      x : -SCREEN_WIDTH / 2 + 100,
      y:SCREEN_HEIGHT / 2 - 100
    },
    useNativeDriver:false
  })

  const bottomRight = Animated.timing(POSITION,{
    toValue:{
      x : SCREEN_WIDTH / 2 - 100,
      y:SCREEN_HEIGHT / 2 - 100
    },
    useNativeDriver:false
  })

  const topRight = Animated.timing(POSITION,{
    toValue:{
      x : SCREEN_WIDTH / 2 - 100,
      y:-SCREEN_HEIGHT / 2 + 100
    },
    useNativeDriver:false
  })

  const moveUp = () => {
    // Animated.timing(POSITION,{
    //   toValue : up ? 200 : -200,
    //   useNativeDriver:false,
    // }).start(toggleUp)
    Animated.loop(
      Animated.sequence([
        bottomLeft,bottomRight,topRight,topLeft
      ])
    ).start();
    
  }
  const borderRadius = POSITION.y.interpolate({
    inputRange : [-300,300],
    outputRange : [100,0]
  })
  const rotation = POSITION.y.interpolate({
    inputRange:[-300,300],
    outputRange:["-360deg","360deg"]
  })
  const bgColor = POSITION.y.interpolate({
    inputRange:[-300,300],
    outputRange:["rgb(255,99,71)","rgb(71,166,255)"]
  })
  return (
    <Container>
        <Box style={{
          borderRadius,
          backgroundColor:bgColor,
          transform : [...POSITION.getTranslateTransform()]
        }} onPress={moveUp}/>
    </Container>
  );
}


