import React from 'react'
import Link from 'next/link'

import { withI18next } from '../lib/withI18next'



export default withI18next(['home'])(({ t, initialI18nStore }) => (
    <div>
        <p>{t('welcome')}</p>
    </div>
))