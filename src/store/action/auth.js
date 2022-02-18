

export const RegisterCompany = (companyname, email, password, hrname, about) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8nN8qN-nzR39dajT5wEalzdwML9scQ0U', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        if (!response.ok) {
            const errordata = await response.json();
            const errorid = errordata.error.message;
            let message = 'Something Went Wrong'
            if (errorid === 'email-already-exists') {
                message = "Enter Email-Id Already Exists Please Enter Different Email-ID"
            }
            throw new Error(message);
        }
        const resData = await response.json()
        localStorage.setItem('data', JSON.stringify({
            token: resData.token
        }))
        const uid = resData.localId
        const response2 = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Company/${uid}/CompanyData.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                companyname,
                email,
                hrname,
                about
            })
        })
        const resData2 = await response2.json()
        dispatch({
            type: "REGISTER_COMPANY", uid: resData.localId, token: resData.token, data: {
                id: resData2.id,
                companyname,
                email,
                hrname,
                about
            }
        })
    }

}

export const registerApplicant = (email, password, firstname, lastname, city, job, url) => {

    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8nN8qN-nzR39dajT5wEalzdwML9scQ0U', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        if (!response.ok) {
            const errordata = await response.json();
            const errorid = errordata.error.message;
            throw new Error(errorid);
        }
        const resData = await response.json()
        localStorage.setItem('data', JSON.stringify({
            token: resData.token
        }))
        const uid = resData.localId

        const response2 = await fetch(`https://resume-parser-bf8d9-default-rtdb.firebaseio.com/Applicant/${uid}/info.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                city,
                job,
                url

            })
        })
        const resData2 = await response2.json()
        dispatch({
            type: "REGISTER_APPLICANT", uid: resData.localId, token: resData.token, data: {
                id: resData2.id,
                firstname,
                lastname,
                email,
                city,
                job,
                url

            }
        })
    }
}

export const LoginHandler = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8nN8qN-nzR39dajT5wEalzdwML9scQ0U', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })
        const resData = await response.json()
        localStorage.setItem('data', JSON.stringify({
            token: resData.token
        }))
        dispatch({ type: 'LOGIN_USER', token: resData.token, uid: resData.localId })
    }
}
