import { LightningElement } from "lwc";

const RED_BELOW_PERCENTAGE = 30;
const ANIMATION_TIME = 4000;

const TIME_CSS_VAR = '--millis-animation';

// colors
const RED_COLOR = '#FF6347';
//const YELLOW_COLOR = '#f3c623'; not user for this development
const GREEN_COLOR = '#228B22';

// property to set in js for filling bars
const END_PERCENTAGE_1 = '--end-width-1';
const END_PERCENTAGE_2 = '--end-width-2';
const END_PERCENTAGE_3 = '--end-width-3';

// bar colors to set in js (represents reaching color)
const COLOR_BAR_1 = '--bar-color-1';
const COLOR_BAR_2 = '--bar-color-2';
const COLOR_BAR_3 = '--bar-color-3';

// counter classes
const COUNTER_1 = '.percentage-counter-1';
const COUNTER_2 = '.percentage-counter-2';
const COUNTER_3 = '.percentage-counter-3';

export default class App extends LightningElement {

  connectedCallback(){ /* render all in renderdCallback */ }

  renderedCallback(){
    this.setPBarProgress();    
  }

  setPBarProgress(){

    // example values
    let actualValue1 = 20;
    let actualValue2 = 70;
    let actualValue3 = 100;

    this.setProperties(END_PERCENTAGE_1, `${actualValue1}%`);
    this.setProperties(END_PERCENTAGE_2, `${actualValue2}%`);
    this.setProperties(END_PERCENTAGE_3, `${actualValue3}%`);

    this.setColorProperty(COLOR_BAR_1, actualValue1);
    this.setColorProperty(COLOR_BAR_2, actualValue2);
    this.setColorProperty(COLOR_BAR_3, actualValue3);

    this.setGrowingCounter(COUNTER_1, actualValue1);
    this.setGrowingCounter(COUNTER_2, actualValue2);
    this.setGrowingCounter(COUNTER_3, actualValue3);

    this.setAnimationsTiming(TIME_CSS_VAR, ANIMATION_TIME);
  }

  setProperties(cssVar, cssValue){
    	const docStyle = document.documentElement.style;
      docStyle.setProperty(cssVar, cssValue);
  }

  setColorProperty(cssVar, actualValue){
    let colorValue = actualValue >= 100 ? 
      GREEN_COLOR : RED_COLOR
    this.setProperties(cssVar, colorValue);
  }

  setGrowingCounter(counterClass, percentageToReach){
    if(percentageToReach !== 0){
      const counterDiv = this.template.querySelector(counterClass);
        let counter = 0;
        let iter = setInterval(() => {
          counterDiv.innerHTML = `${counter}%`;
          counter++;
          if(counter >= percentageToReach + 1){
            clearInterval(iter);
          }
        }, ANIMATION_TIME/percentageToReach);
    }
  }

  setAnimationsTiming(cssVar, animationTiming){
    this.setProperties(cssVar, `${animationTiming}ms`);
  }
}
