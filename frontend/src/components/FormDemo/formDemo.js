import React from 'react'

function formDemo() {
  return (
    <div>
        <p className="display-1 text info">FormDemo</p>
        {/*user sign up form*/}
        <from classicName='w-50 mx-auto mt-5'>
            {/*username*/}
            <div className='mb-3'>
                <label htmlFor='username' className='form-label'>username</label>
                <input type="text"name="" id="usename" className='form-control'{...register('username')}
            </div>
        </from>
    </div>
  )
}

export default formDemo