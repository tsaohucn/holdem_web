// node_module
import React from 'react'
// local components
import withHoldemBar from '../../hocs/withHoldemBar'
import contentCompose from '../../hocs/contentCompose'
import PageOne from '../../views/PageOne'

const PageOneComponent = (props) => 
  <PageOne
    {...props} 
    buttonLeftTitle='搜索' 
    buttonRightTitle='新增會員'
  />

const PageTwoComponent = () => <h1>PageTwoComponent</h1>
const PageThreeComponent = () => <h1>PageThreeComponent</h1>

const MemberScreen = contentCompose(PageOneComponent,PageTwoComponent,PageThreeComponent)

export default withHoldemBar(MemberScreen);