import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Easing, Pressable, TouchableOpacity,PanResponder } from 'react-native';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

// const Box = styled(Animated.createAnimatedComponent(Pressable))`
const Box = styled.View`
background-color: tomato;
width: 200px;
height: 200px;
`
const AnimatedBox = Animated.createAnimatedComponent(Box);


const {width:SCREEN_WIDTH,height:SCREEN_HEIGHT} = Dimensions.get("window");
export default function App() {
  const POSITION = useRef(new Animated.ValueXY({x:0,y:0})).current
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


  const panResponder = useRef(PanResponder.create({
    //true를 리턴하여 사각형에 터치를 감지
    onStartShouldSetPanResponder : () => true,

    //움직임이 시작될때 호출된다
    onPanResponderGrant:()=>{
      //0이 아니라 이전 위치에서 시작하라고 명시
      console.log("start");
      POSITION.setOffset({
        x:POSITION.x._value,
        y:POSITION.y._value
      })
    },
    onPanResponderMove : (_,{dx,dy})=>{
      //dy,dx는 손가락이 이동한거리 이기때문에 0에서부터 시작한다
      //사용자에 터치에따라 위치 변경
      POSITION.setValue({
        x:dx,
        y:dy
      })
    },
    //사용자가 손을 떼었을때
    onPanResponderRelease:()=>{
      //터치가 끝나면 오프셋 초기화
      POSITION.flattenOffset();
      // Animated.spring(POSITION,{
      //   toValue:{
      //     x:0,
      //     y:0
      //   },
      //   useNativeDriver:false
      // }).start()


    }
  })).current;
  console.log(panResponder)
  return (
    <Container>
        <AnimatedBox 
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          backgroundColor:bgColor,
          transform : POSITION.getTranslateTransform()
        }} 
        />

{/* {...panResponder.panHandlers}
        style={{
          borderRadius,
          backgroundColor:bgColor,
          transform : [...POSITION.getTranslateTransform()]
        }} */}
    </Container>
  );
}


