import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Easing, Pressable, TouchableOpacity,PanResponder, View } from 'react-native';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import {Ionicons} from "@expo/vector-icons"

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00a8ff;
`

const Card = styled.View`
  background-color: white;
  width: 250px;
  height: 250px;
  justify-content: center;
  align-items:center;
  border-radius:12px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
`
const AnimatedBox = Animated.createAnimatedComponent(Card);

export default function App() {
  

  
  const scale = useRef(new Animated.ValueXY({x:0,y:0})).current
  // const onPressIn = () => {
  //   Animated.spring(scale,{toValue:0.95,useNativeDriver:true}).start()
  // }
  // const onPressOut = () => Animated.spring(scale,{toValue:1,useNativeDriver:true}).start()

  const panResponse = useRef(PanResponder.create({
    onStartShouldSetPanResponder : () => true,
    onPanResponderGrant:() => {
      Animated.spring(scale,{toValue:0.95,useNativeDriver:true}).start()
    },
    // onPanResponderRelease:() => onPressOut()
  })).current

  // console.log(scale)
  return (
    <Container>
      <AnimatedBox 
      {...panResponse.panHandlers}
      styled={{
        transform:[{scale}]
      }}>
        <Ionicons name='pizza' color="#192a56" size={98}/>
      </AnimatedBox>
    </Container>
  );
}


