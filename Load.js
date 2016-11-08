import React, { Component,PropTypes } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	PixelRatio,
	Platform,
	Animated,
} from 'react-native';
const InteractionManager = require('InteractionManager');
const Dimensions = require('Dimensions');

export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get("window").height;
export const Scale = PixelRatio.get();//返回设备的像素密度
const LoadImage = [
	require("./gif/load1.gif"),
	require("./gif/Load2.gif"),
	require("./gif/Load3.gif"),
	require("./gif/Load4.gif"),
	require("./gif/Load6.gif"),
	require("./gif/Load7.gif"),
]

class Load extends Component{
	propTypes:{
		// title:PropTypes.string.isRequired,
		ref:PropTypes.string.isRequired,
		opacity:PropTypes.number,
		bgColor:PropTypes.string,
		isShow:PropTypes.bool,
		Image:PropTypes.number,
		showBtn:PropTypes.bool,
		BtnStyle:PropTypes.any,
		bgAnimate:PropTypes.string,
		fadeWay:PropTypes.string
	}
	static get defaultProps(){
		return {
			onLoadEnd:()=>{},
			opacity:0.6,
			bgColor:"#000000",
			isShow:false,
			Image:0,
			showBtn:false,
			BtnStyle:{},
			bgAnimate:"default",//默认背景动画动画,有两种
			fadeWay:"up",//默认上面出来上面出去
		}
	}
	constructor(props){
		super(props);
		this.state = {
			fadeIn: new Animated.Value(0),
			fadeOut: new Animated.Value(0),
			zIndex:-10,
			fadeAnim:new Animated.Value(0),//默认从0开始
			children:false,//默认没有子元素
			settime:null,//时间定时器
		}
	}
	render() {
		// if(this.props.NoShowLoad){
		// 	return null;
		// }
		return (
			<View style={[styles.container,{zIndex:this.state.zIndex}]}>
				<Animated.View style={[styles.center,{backgroundColor:this.props.bgColor,opacity:this.state.fadeAnim}]}>
					{this.isCustom()}
				</Animated.View>
			</View>
		)
	}
	isCustom(){
		// 是否有子元素
		let AnimatedWay = this._upORdown();
		if(this.props.children){
			return (
				<Animated.View style={{flex:1,transform:[
					{
						translateY:this.state.fadeIn.interpolate({
							inputRange:[0,1],
							outputRange:AnimatedWay.in
						})
					},
					{
						translateY:this.state.fadeOut.interpolate({
							inputRange:[0,1],
							outputRange:AnimatedWay.out
						})
					}
				]}}>
					{React.cloneElement(this.props.children)}
					{this._showButton()}
				</Animated.View>
			)
		}
		else{
			return (
				<Animated.View style={{flex:1,transform:[
					{
						translateY:this.state.fadeIn.interpolate({
							inputRange:[0,1],
							outputRange:AnimatedWay.in
						})
					},
					{
						translateY:this.state.fadeOut.interpolate({
							inputRange:[0,1],
							outputRange:AnimatedWay.out
						})
					}
				]}}>
					<Animated.Image style={[styles.img,{width:this.props.Image===0?120:150,height:this.props.Image===0?120:150}]} source={LoadImage[this.props.Image]} />
					{this._showButton()}
				</Animated.View>
			)
		}
	}
	_upORdown(way){
		// 获取设置的动画方向,暂时只能哪个方向进就哪个方向出
		let AnimatedWay = {};
		switch(this.props.fadeWay){
			case "up":
				AnimatedWay.in = [-120,Height/2+50];
				AnimatedWay.out = [-120,-(Height/2+50)];
				break;
			case "down":
				AnimatedWay.in = [Height,-(Height/2+100)];
				AnimatedWay.out = [Height,Height/2+100];//暂时无法实现
				break;
		}
		return AnimatedWay;
	}
	_showButton(){
		// 如果现实退出按钮
		if(this.props.showBtn){
			return (
				<TouchableOpacity 
					style={[styles.close,this.props.BtnStyle]}
					activeOpacity={0.9}
					onPress={()=>{this._onPress()}}>
					<Text style={{color:"#fff",fontSize:15}}>×</Text>
				</TouchableOpacity>
			)
		}
		return null;
	}
	_onPress(){
	// 	const {navigator} = this.props;
	// 	navigator.pop();
		this.CloseLoad();
	}
	CloseLoad(Animate=this.props.bgAnimate){
		clearTimeout(this.state.settime);
		switch(Animate){
			case "default":
				this._DefaultAnimate("close");
				break;
			case "opacity":
				this._OpacityAnimate("close");
				break;
			default:
				this._DefaultAnimate("close");
		}
	}
	OpenLoad(Animate=this.props.bgAnimate){
		switch(Animate){
			case "default":
				this._DefaultAnimate("show");
				break;
			case "opacity":
				this._OpacityAnimate("show");
				break;
			default:
				this._DefaultAnimate("show");
		}
	}
	setTimeClose(time=2000){
		this.OpenLoad();
		this.state.settime = setTimeout(()=>{
			this.CloseLoad();
		},time)
	}
	_OpacityAnimate(status){
		// 控制opacity显示隐藏动画函数
		if(status==="show"){
			this.setState({
				zIndex:10
			});
			// 动画放后面是因为要先显示,否则动画执行开始用户无法看到
			this.state.fadeAnim.setValue(0);
			Animated.timing(this.state.fadeAnim,{toValue:this.props.opacity}).start(()=>{
				this._StartAnimate();
			});
		}
		else{
			this.state.fadeAnim.setValue(this.props.opacity);//初始化为用户定义的值
			this._EndAnimate(()=>{
				Animated.timing(this.state.fadeAnim,{toValue:0,duration: 200}).start(()=>{
					this.setState({
						zIndex:-10
					});
					// 动画执行完再隐藏
				});
			});
			
		}
	}
	_DefaultAnimate(status){
		// 默认的动画
		if(status==="show"){
			this.state.fadeAnim.setValue(this.props.opacity);//初始化为用户定义的值
			this.setState({
				zIndex:10
			});
			this._StartAnimate();
		}
		else{
			this._EndAnimate(()=>{
				this.state.fadeAnim.setValue(0);
				this.setState({
						zIndex:-10
					});
			});
		}
	}
	_StartAnimate(){
		this.state.fadeIn.setValue(0);
		this.state.fadeOut.setValue(0);
		Animated.spring(
			this.state.fadeIn,
			{toValue: 1,duration: 200,friction:6,tension:20},
		).start();
	}
	_EndAnimate(callback){
		this.state.fadeOut.setValue(0);
		this.state.fadeIn.setValue(0);
		Animated.timing(
			this.state.fadeOut,
			{toValue: 1,duration: 200,delay:0},
		).start(()=>{
			callback()
		});
	}
	componentDidMount(){
		// this.props.onLoadEnd();
		if(this.props.isShow){
			this.OpenLoad();
		}
		else{
			this.setState({
				zIndex:-10
			})
		}
	}
	// componentWillMount(){
	// 	// 是否有子元素
	// 	if(this.props.children){
	// 		this.setState({
	// 			children:true
	// 		})
	// 	}
	// }
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		// backgroundColor:"rgba(255,255,255,0.9)",
		// backgroundColor:"#3ca7f4",
	},
	center:{
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#000000',
		opacity: 0.6,
		justifyContent: 'center',
		alignItems:"center"
	},
	img:{
		width:150,
		height:150,
		borderRadius:20,
		resizeMode:"cover",
		backgroundColor: 'transparent',
	},
	close:{
		position:"absolute",
		top:5,
		right:5,
		backgroundColor:"#3ca7f4",
		borderRadius:12,
		width:26,
		height:26,
		borderWidth:2,
		borderColor:"#fff",
		justifyContent:"center",
		alignItems:"center"
	}
});

export default Load;