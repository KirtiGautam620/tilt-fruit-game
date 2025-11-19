import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {View,StyleSheet,Dimensions,Text,Image,ImageBackground} from "react-native";
import { Accelerometer } from "expo-sensors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const BASKET_WIDTH = 90;
const BASKET_HEIGHT = 50;

const ITEM_WIDTH = 40;
const ITEM_HEIGHT = 40;

const INITIAL_LIVES = 3;
export default function App() {
  const [basketX,setBasketX]=useState((screenWidth-BASKET_WIDTH)/2);
  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const subscription=Accelerometer.addListener(({x})=>{
      const m=x*80; 
      setBasketX(prev=>Math.max(0,Math.min(screenWidth-BASKET_WIDTH,prev+m)));
    });
    return () => subscription.remove();
  }, []);

  const [items,setItems]=useState([]);
  useEffect(()=>{
    const interval=setInterval(()=>{
      const newItem={
        id:Date.now(),
        x:Math.random()*(screenWidth-ITEM_WIDTH),
        y:-ITEM_HEIGHT,
        type:Math.random()>0.2?(["orange","strawberry","apple","pome","cherry","mango"][Math.floor(Math.random()*6)]):"bad",
      };
      setItems(p=>[...p,newItem]);
    },1500); 
    return () => clearInterval(interval);
  }, []);

  const [score, setScore]=useState(0);
  const [lives, setLives]=useState(INITIAL_LIVES);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev=>
        prev.map(a=>({...a,y:a.y+5})) 
          .filter(a=>{
            const hit =
              a.x<basketX+BASKET_WIDTH &&
              a.x+ITEM_WIDTH>basketX &&
              a.y+ITEM_HEIGHT>screenHeight-BASKET_HEIGHT;
            if (hit) {
              if (a.type !== "bad") setScore(s=>s+1);
              else setLives(l => l - 1);
              return false;
            }
            return a.y<screenHeight; 
          })
      );
    },40);

    return () => clearInterval(interval);
  }, [basketX]);

  if (lives <= 0) {
    return (
      <ImageBackground source={require('./assets/background.jpg')} style={styles.container}>
        <Text style={styles.gameOver}>Game Over</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('./assets/background.jpg')} style={styles.container}>
      {items.map(item => (
        item.type === "bad" ? (
          <Image
            key={item.id}
            source={require('./assets/bomb.png')}
            style={[
              styles.bomb,
              { left: item.x, top: item.y },
            ]}
          />
        ) : (
          <Image
            key={item.id}
            source={
              item.type === "orange" ? require('./assets/orange.png') :
              item.type === "strawberry" ? require('./assets/strawberry.png') :
              item.type === "apple" ? require('./assets/apple.png') :
              item.type === "pome" ? require('./assets/pome.png') :
              item.type === "cherry" ? require('./assets/cherry.png') :
              require('./assets/mango.png')
            }
            style={[
              styles.item,
              { left: item.x, top: item.y },
            ]}
          />
        )
      ))}

      <View style={[styles.basket, { left: basketX }]}>
        <Image source={require('./assets/basket.png')} style={styles.basketImage} />
      </View>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.lives}>Lives: {lives}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b365e8ff", 
  },
  basket: {
    position: "absolute",
    bottom: 20,
    width: BASKET_WIDTH+5,
    height: BASKET_HEIGHT+20,
  },
  item: {
    position: "absolute",
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 20,
  },
  bomb: {
    position: "absolute",
    width: ITEM_WIDTH+20,
    height: ITEM_HEIGHT+20,
    borderRadius:50
  },
  basketImage: {
    width: BASKET_WIDTH+10,
    height: BASKET_HEIGHT+10,
    alignSelf: 'center',
  },
  score: {
    position: "absolute",
    top: 40,
    left: 20,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  lives: {
    position: "absolute",
    top: 40,
    right: 20,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  gameOver: {
    fontSize: 36,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 200,
  },
});
