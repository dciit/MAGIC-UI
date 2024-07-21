import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress, Button, Input } from '@mui/material';
import axios from 'axios';
import { KeyboardEvent, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-daikin-with-text.jpg'
import { ThemeContext } from '@emotion/react';
import { LoginInterface, LoginByInterface, LoginData } from '../interface/login.interface';
import { persistor } from '../redux/store';
import { API_LOGIN_EMPLOYEE } from '../service/login.service';
function Login() {
  const theme = useContext(ThemeContext);
  const [login, setLogin] = useState<LoginInterface>({
    login: false,
    load: false,
    message: '',
  })
  const base = import.meta.env.VITE_PATH;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginByList] = useState<LoginByInterface[]>([
    { text: 'รหัสพนักงาน', value: 'employee' },
    { text: 'รหัสเข้าคอมพิวเตอร์', value: 'ad' }
  ]);
  const [loginBy, setLoginBy] = useState<string>(loginByList[0].value);
  const [loginData, setLoginData] = useState<LoginData>({
    user: '',
    pass: ''
  });
  async function handleLogin() {
    if (loginData.user != '' && loginData.user != '') {
      setLogin({ ...login, load: true });
      if (loginBy == 'employee') {
        if (loginData.user.length < 5) {
          setLogin({ ...login, load: false, message: `กรุณากรอกรหัสพนักงานให้ครบถ้วน !` });
          return false;
        }
        let resLogin = await API_LOGIN_EMPLOYEE(loginData.user);
        if (typeof resLogin.status != 'undefined' && resLogin.status != 404 && resLogin != "") {
          setTimeout(() => {
            if (typeof resLogin.empcode != 'undefined' && resLogin.empcode != '') {
              dispatch({
                type: 'LOGIN', payload: {
                  code: resLogin.empcode,
                  name: resLogin.name,
                  fullname: resLogin.fullname,
                  pren: resLogin.pren,
                  surn: resLogin.surn,
                  login: true
                }
              });
              setLogin({ ...login, load: false, message: ``, login: true });
            } else {
              setLogin({ ...login, load: false, message: `ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก : ไม่พบข้อมูลพนักงานของคุณ (${loginData.user})` });
            }
          }, 1000);
        } else {
          setLogin({ ...login, load: false, message: `ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก : ${resLogin?.message} (${resLogin?.status})` });
        }
      } else {
        axios.get('http://websrv01.dci.daikin.co.jp/BudgetCharts/BudgetRestService/api/authen?username=' + loginData.user + '&password=' + encodeURIComponent(loginData.pass)).then((res) => {
          if (res.data[0]?.FullName != null) {
            try {
              persistor.purge();
              dispatch({
                type: 'LOGIN', payload: {
                  code: res.data[0].EmpCode,
                  name: res.data[0].ShortName,
                  fullname: res.data[0].FullName,
                  pren: "",
                  surn: res.data[0].FullName.substring((res.data[0].FullName).indexOf(' ')),
                  login: true
                }
              });
              setLogin({ ...login, load: false, message: ``, login: true });
            } catch (e: any) {
              setLogin({ ...login, load: false, message: `ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก :  ${e.message}` });
            }
          } else {
            setLogin({ ...login, load: false, message: `ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก : ไม่พบข้อมูลพนักงานของคุณ (${loginData.user})` });
          }
        }).catch((err) => {
          setLogin({ ...login, load: false, message: `ไม่สามารถเข้าสู่ระบบได้ เนื่องจาก : ${err?.message} (${err?.status})` });
        });
      }
    }

  }
  useEffect(() => {
    if (login.login == true) {
      navigate(`../${base}/home`)
    }
  }, [login])
  return (
    <div className='bg-whtie text-black flex justify-center items-center h-full w-full flex-col  select-none'>
      <div className='shadow-lg px-6 py-9 rounded-lg flex flex-col gap-6  w-[80%] sm:w-[70%] md:w-[50%] lg:w-[30%] xl:w-[25%]'>
        <div className='w-[100%]  flex flex-col items-center'>
          <img src={logo} className='w-[75%] bg-red-500'/>
        </div>
        <div className='flex flex-col items-center w-full '>
          <div className='flex '>
            <span className={`text-[2em] font-semibold  drop-shadow-lg`}>PROJECT SYSTEM</span>
          </div>
        </div>
        <div className='mb-[18px] pt-[30px]'>
          <span className='font-semibold text-[18px]'>Login</span>
        </div>
        {
          loginBy == 'employee' ?
            <div className='flex flex-col gap-1  w-full'>
              <span className=' text-gray-600 text-[.9rem]'>รหัสพนักงาน</span>
              <Input type='text' className='bg-gray-50 text-[24px] h-full text-center tracking-[12px] font-bold' placeholder='12345' value={loginData.user} onChange={(e) => {
                let isnum = /^\d+$/.test(e.target.value);
                if (e.target.value.length > 0 && !isnum) {
                  e.target.value = e.target.value.slice(0, -1);
                }
                if (e.target.value.length > 5) {
                  setLoginData({
                    user: e.target.value.substring(0, 5), pass: e.target.value.substring(0, 5)
                  })
                } else {
                  setLoginData({
                    user: e.target.value, pass: e.target.value
                  })
                }
              }} onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key == 'Enter') {
                  handleLogin();
                }
              }} autoFocus={true} />
            </div> :
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-1'>
                <span className=' text-gray-600 text-[.9rem]'>ชื่อผู้ใช้งาน</span>
                <Input className='bg-gray-50 text-[16px] h-full text-center' placeholder='ชื่อจริง.นามสกุลตัวแรก (ภาษาอังกฤษ)' value={loginData.user} onChange={(e) => setLoginData({
                  ...loginData, user: e.target.value
                })} autoFocus={true} />
              </div>
              <div className='flex flex-col gap-1'>
                <span className=' text-gray-600 text-[.9rem]'>รหัสผ่าน</span>
                <Input type='password' className='bg-gray-50 text-[16px] h-full text-center' placeholder='รหัสผ่านเข้าคอมพิวเตอร์' value={loginData.pass} onChange={(e) => setLoginData({
                  ...loginData, pass: e.target.value
                })} />
              </div>
            </div>
        }
        <div className='mt-1 flex justify-center'>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
            <RadioGroup
              row
              value={loginBy}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setLoginData({
                  user: '', pass: ''
                });
                setLoginBy(e.target.value);
              }}
            >
              {
                loginByList.map((o: LoginByInterface, i: number) => {
                  return <FormControlLabel key={i} value={o.value} control={<Radio />} label={o.text} />
                })
              }
            </RadioGroup>
          </FormControl>
        </div>
        <div className=' text-center'>
          <span className='text-red-500 text-[14px] w-full'>{login.message}</span>
        </div>
        <div className='items-center flex justify-center pt-10'>
          <div className={`flex flex-row items-center gap-2 text-center  cursor-pointer select-none transition-all duration-300 text-white ${login.load ? 'pl-4 pr-6 bg-[#2196f387] ' : 'px-6 bg-[#108de7] hover:bg-[#2196f3]'} py-2 rounded-xl shadow-md w-fit`} onClick={() => {
            login.load == true ? null : handleLogin()
          }}>
            {
              login.load && <CircularProgress color='inherit' size={'18px'} />

            }
            <span>{login.load ? 'กำลังเข้าสู่ระบบ' : 'เข้าสู่ระบบ'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login