# Tilt Fruit Game

A fun and addictive tilt-controlled game built with React Native and Expo. Use your device's accelerometer to move a basket and catch falling fruits while avoiding bombs!

## Description

Tilt Fruit is a mobile game where players control a basket by tilting their device. Fruits fall from the top of the screen, and the goal is to catch as many as possible to increase your score. Be careful though – bombs also fall, and hitting them will cost you a life. The game ends when you run out of lives.

## Demo

Check out a demo of the game: [Demo Video](https://drive.google.com/file/d/16-21Vprfke_sSlGtSLKFGBaIP1mSNXIe/view?usp=sharing)

## Features

- **Tilt Controls**: Use your device's accelerometer to move the basket left and right.
- **Scoring System**: Earn points for each fruit caught.
- **Lives System**: Start with 3 lives; lose one for each bomb hit.
- **Game Over Screen**: Displays final score when lives reach zero.
- **Variety of Fruits**: Catch oranges, strawberries, apples, pomegranates, cherries, and mangoes.
- **Bomb Avoidance**: Dodge falling bombs to survive longer.
- **Smooth Gameplay**: Optimized for mobile devices with responsive controls.

## Installation

1. **Prerequisites**:
   - Node.js (version 14 or higher)
   - Expo CLI (`npm install -g @expo/cli`)
   - A mobile device or emulator with Expo Go app installed

2. **Clone the repository**:
   ```
   git clone <repository-url>
   cd tilt-fire-template
   ```

3. **Install dependencies**:
   ```
   npm install
   ```

4. **Start the development server**:
   ```
   npm start
   ```

5. **Run on device**:
   - Scan the QR code with the Expo Go app on your phone, or
   - Use the Expo Developer Tools in your browser to run on an emulator/simulator

## Usage

- Launch the app using Expo.
- Tilt your device left or right to move the basket.
- Catch falling fruits to increase your score.
- Avoid bombs to preserve your lives.
- The game ends when you have no lives left.

## Controls

- **Tilt Left/Right**: Move the basket horizontally by tilting your device.
- The sensitivity can be adjusted in the code if needed (currently set to x*80 multiplier).

## Assets

The game uses various image assets located in the `assets/` folder:
- `background.jpg`: Game background image
- `basket.png`: Basket image
- `bomb.png`: Bomb image
- Fruit images: `apple.png`, `cherry.png`, `grapes.jpeg`, `mango.png`, `orange.png`, `pome.png`, `strawberry.png`
- Other assets: `adaptive-icon.png`, `favicon.png`, `icon.png`, `splash-icon.png`

## Technologies Used

- **React Native**: For building the mobile app
- **Expo**: For development and deployment
- **expo-sensors**: For accelerometer data to control basket movement


