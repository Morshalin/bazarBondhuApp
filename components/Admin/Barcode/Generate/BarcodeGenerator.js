import React from 'react'
import { useBarcode } from 'react-barcodes'

const BarcodeGenerator = ({ barcode }) => {
	const { inputRef } = useBarcode({
		value: barcode,
		options: {
			displayValue: false,
			background: '#fff',
			height: 25,
			width: 1.5,
			format: 'CODE128',
			margin: 5,
		},
	})

	return <img ref={inputRef} />
}

export default BarcodeGenerator
