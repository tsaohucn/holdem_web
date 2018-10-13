const errorAlert = (alert,message) => {
    alert.show(message,{
        type: 'error',
        timeout: 2000
    })
}

const successAlert = (alert,message) => {
    alert.show(message,{
        type: 'success',
        timeout: 2000
    })
}

export { errorAlert, successAlert }