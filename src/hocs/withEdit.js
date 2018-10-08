// node_module
import React, { PureComponent } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
// local_module
import EditComponent from '../components/EditComponent'
import firebase from '../configs/firebase'
import { errorAlert, successAlert, sleep } from '../helpers'

function withEdit(params) {
  const {
    title,
    resource,
    wrapperComponent,
    by,
    belong
  } = params ? params : {}

  return class extends PureComponent {

    constructor(props) {
      super(props)
      this.key = this.props.match.params.key || ''
      this.state = {
        isLoading: true,
        event: '載入中',
        data: {}
      }
    }

    componentDidMount() {
      this.fetchTableData(firebase.database().ref(resource + '/' + this.key))
    }


    fetchTableData = async (fetch) => {
      try {
        await sleep(500)
        const optionsPromise = belong.map(belongResource => firebase.database().ref(belongResource + 's').once('value'))
        const optionsSnap = await Promise.all(optionsPromise)
        let options = {}
        optionsSnap.forEach((snap,index) => {
          const val = snap.val()
          const keys = Object.keys(val || [])
          const option = keys.map(key => {
            return({
              id: val[key].id,
              id_name: val[key].id + ' : ' + val[key].name
            })
          })
          options[belong[index] + '_id'] = option
        })
        const snap = fetch && (await fetch.once('value'))
        const data = (snap && snap.val()) || {}
        this.setState({
          isLoading: false,
          data,
          ...options
        }) 
      } catch(err) {
        errorAlert(this.props.alert,'載入資料發生錯誤 : ' + err.toString())
      } finally {
        //
      }      
    }

    updateData = (data) => {
      this.setState({
        isLoading: true,
        event: '更新資料中'
      },async () => {
        try {
          await sleep(500)
          await firebase.database().ref(resource + '/' + this.key).update(data)
          if (resource === 'referees' || resource === 'sales') {
            await firebase.database().ref('/backends/' + this.key).update({
              account: data.account,
              password: data.password
            })
          } else if (resource === 'employees') {
            // 較麻煩
          }
          successAlert(this.props.alert,'更新成功')
          this.goBack()
        } catch(err) {
          errorAlert(this.props.alert,'更新失敗 : ' + err.toString())
          this.setState({
            isLoading: false
          })
        } finally {
          //
        }
      })
    }

    deleteData = (data) => {
      this.setState({
        isLoading: true,
        event: '刪除資料中'
      },async () => {
        try {
          await sleep(500)
          if (resource === 'referees' || resource === 'sales') {
            const memberCount = data.memberCount
            if (memberCount > 0) {
              throw '此人底下存在會員'
            } else {
              await firebase.database().ref('nonuse_' + resource + '/' + this.key).update(data)
              await firebase.database().ref('/backends/' + this.key).update({
                nonuse: true
              })
              await firebase.database().ref(resource + '/' + this.key).remove()
              switch(resource) {
                case 'referees':
                await firebase.database().ref('clubs/' +  data['club_key'] + '/refereeCount').transaction(count => {
                  if (!count) {
                    return 0
                  } else {
                    return count - 1
                  }
                })                   
                break
                case 'sales':
                await firebase.database().ref('clubs/' +  data['club_key'] + '/saleCount').transaction(count => {
                  if (!count) {
                    return 0
                  } else {
                    return count - 1
                  }
                }) 
                break
              }              
            }
          } else if (resource === 'members') {
            await firebase.database().ref('nonuse_' + resource + '/' + this.key).update(data)
            await firebase.database().ref(resource + '/' + this.key).remove()
            await firebase.database().ref('clubs/' +  data['club_key'] + '/memberCount').transaction(count => {
              if (!count) {
                return 0
              } else {
                return count - 1
              }
            })
            await firebase.database().ref('referees/' +  data['referee_key'] + '/memberCount').transaction(count => {
              if (!count) {
                return 0
              } else {
                return count - 1
              }
            })
            await firebase.database().ref('sales/' +  data['sale_key'] + '/memberCount').transaction(count => {
              if (!count) {
                return 0
              } else {
                return count - 1
              }
            })   
          }
          else if (resource === 'employees') {
            // 較麻煩
          }
          successAlert(this.props.alert,'刪除成功')
          this.goBack()
        } catch(err) {
          errorAlert(this.props.alert,'刪除失敗 : ' + err.toString())
        } finally {
          this.setState({
            isLoading: false
          })
        }
      })       
    }
/*

    gotToAccount = (key) => {
      this.props.history.push('/'+ resource + '/account/' + key)
    }

    gotToPassword = (key) => {
      this.props.history.push('/'+ resource + '/password/' + key)
    }
*/
    goBack = () => {
      this.props.history.goBack()
    }

    render() {
      const Component = wrapperComponent ? wrapperComponent : EditComponent
      return(
        <div 
          style={styles.container} 
        >
          {
            this.state.isLoading ? 
            <div style={styles.spinner}>
              <CircularProgress size={50}/>
              {/*<h3>{this.state.event}</h3>*/}
            </div>
            :
            <Component
              {...this.props}
              {...this.state}
              title={title}
              onClickEditReturnButton={this.goBack}
              onClickEditConfirmButton={this.updateData}
              confirmDelete={this.deleteData}
              //onClickAccount={this.gotToAccount}
              //onClickPassword={this.gotToPassword}
            />
          }
        </div>
      )
    }
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  spinner: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default withEdit