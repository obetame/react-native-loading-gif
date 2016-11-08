import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Navigator,
	PixelRatio,
	TouchableOpacity,
	Alert
} from 'react-native';
import Load from "./Load";

class Nav extends Component{
	render(){
		const {isShow,opacity,bgColor,Image,showBtn,BtnStyle,bgAnimate,fadeWay,childen} = this.props;
		return (
			<View style={[styles.container,{backgroundColor:bgColor?bgColor:"#76EEC6"}]}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={()=>{this._onPress(1)}}
					style={styles.btn}>
					<Text style={styles.text}>Up Animation</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={()=>{this._onPress(2)}}
					style={styles.btn}>
					<Text style={styles.text}>Down Animation</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={()=>{this._onPress(3)}}
					style={styles.btn}>
					<Text style={styles.text}>opacity Animation</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={()=>{this._onPress(4)}}
					style={styles.btn}>
					<Text style={styles.text}>No opacity Animation</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={()=>{this.Toast()}}
					style={styles.btn}>
					<Text style={styles.text}>Toast</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={()=>{this.Comfirm()}}
					style={styles.btn}>
					<Text style={styles.text}>Comfirm</Text>
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={()=>{this._onPress(5)}}
					style={styles.btn}>
					<Text style={styles.text}>Select GIF</Text>
				</TouchableOpacity>
				{this._renderLoad()}
				<Load 
					isShow={isShow} 
					opacity={opacity} 
					bgColor={bgColor} 
					Image={Image} 
					showBtn={true} 
					BtnStyle={{width:26,height:26,borderRadius:12}} 
					bgAnimate={bgAnimate} 
					fadeWay={fadeWay} 
					ref="LoadToast">
					<View style={styles.Loadbody}>
						<Text style={styles.tip}>提示</Text>
						<View style={styles.btns}>
							<Text style={styles.toasttext}>This is a Toast!</Text>
						</View>
					</View>
				</Load>
				<Load 
					isShow={isShow} 
					opacity={opacity} 
					bgColor={bgColor} 
					Image={Image} 
					showBtn={showBtn} 
					BtnStyle={BtnStyle} 
					bgAnimate={bgAnimate} 
					fadeWay={fadeWay} 
					ref="LoadComfirm">
					<View style={styles.Loadbody}>
						<Text style={styles.tip}>提示</Text>
						<View style={styles.btns}>
							<TouchableOpacity
								activeOpacity={0.9}
								onPress={()=>{this._LoadComfirm("no")}}
								style={styles.btnleft}>
								<Text style={styles.btntext}>取消</Text>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={0.9}
								onPress={()=>{this._LoadComfirm("yes")}}
								style={styles.btnright}>
								<Text style={styles.btntext}>确定</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Load>
			</View>
		)
	}
	_renderLoad(){
		const {isShow,opacity,bgColor,Image,showBtn,BtnStyle,bgAnimate,fadeWay,childen} = this.props;
		return (
			<Load 
				isShow={isShow} 
				opacity={opacity} 
				bgColor={bgColor} 
				Image={Image} 
				showBtn={showBtn} 
				BtnStyle={BtnStyle} 
				bgAnimate={bgAnimate} 
				fadeWay={fadeWay} 
				ref="Load">
			</Load>
		)
	}
	Toast(){
		this.refs.LoadToast.setTimeClose();
	}
	Comfirm(){
		this.refs.LoadComfirm.OpenLoad();
	}
	_LoadComfirm(message){
		if(message==="no"){
			Alert.alert("Comfirm","you click No");
		}
		else{
			Alert.alert("Comfirm","you click Yes");
		}
		this.refs.LoadComfirm.CloseLoad();
	}
	_onPress(index){
		const {navigator} = this.props;
		if(index===1){
			navigator.push({
				name:"Nav",component:Nav,index:1,params:{bgColor:"#303030",opacity:1,fadeWay:"up"}
			});
			return;
		}
		if(index===2){
			navigator.push({
				name:"Nav",component:Nav,index:2,params:{bgColor:"#00EE00",opacity:1,fadeWay:"down"}
			});
			return;
		}
		if(index===3){
			navigator.push({
				name:"Nav",component:Nav,index:3,params:{bgColor:"#8DEEEE",bgAnimate:"opactiy"}
			});
			return;
		}
		if(index===4){
			navigator.push({
				name:"Nav",component:Nav,index:4,params:{bgColor:"#CD0000",bgAnimate:"default"}
			});
			return;
		}
		if(index===5){
			navigator.push({
				name:"Nav",component:Nav,index:5,params:{bgColor:"#CD0000",bgAnimate:"default",Image:1}
			});
			return;
		}
	}
	componentDidMount(){
		this.refs.Load.setTimeClose();
		// setTimeout(()=>{
			// this.refs.Load.OpenLoad();
		// },2000)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection:"column",
		backgroundColor: '#76EEC6',
		marginTop:20,
		flex:1,
		justifyContent:"center",
	},
	btn:{
		marginLeft:40,
		marginRight:40,
		alignItems:"center",
		justifyContent:"center",
		height:40,
		borderWidth:2,
		borderColor:"#fff",
		borderRadius:10,
		marginTop:10
	},
	text:{
		color:"#fff",
		fontSize:20,
		fontWeight:"bold"
	},
	Loadbody:{
		flexDirection:"column",
		backgroundColor:"#fff",
		width:200,
		height:100,
		justifyContent:"center",
		alignItems:"center",//水平中间
		borderRadius:10
	},
	tip:{
		fontSize:20,
		color:"#000"
	},
	btns:{
		flexDirection:"row",
		width:200,
		marginTop:20,
		justifyContent:"space-around",
	},
	btnleft:{
		width:90,
		height:30,
		alignItems:"center",
		borderColor:"#303030",
		borderWidth:2,
		borderRadius:10,
		justifyContent:"center",
	},
	btnright:{
		width:90,
		height:30,
		alignItems:"center",
		borderColor:"#303030",
		borderWidth:2,
		borderRadius:10,
		justifyContent:"center",
	},
	btntext:{
		color:"#000",
		fontSize:16
	},
	toasttext:{
		color:"#000",
		fontSize:16
	}
});

export default Nav;