import React from 'react'

import { withI18next } from '../lib/withI18next'


export default withI18next(['home'])(({ t, initialI18nStore }) => ( // eslint-disable-line no-unused-vars
    <div>
        <p>{t('welcome')}</p>
    </div>
))
