import { Fragment, useEffect, useState } from 'react'
import { Checklist, ListActions } from '../SvgContainer'
import { Checkbox } from '@mui/material'
import { makeId } from '../../services/util.service'

export function CardDates({dates}) {
	const {dueDate} = dates

	return(
		<div>
			{dueDate}
		</div>
	)
}
