import { Breadcrumbs, Link, Typography } from '@mui/material'
import { base } from '../../constants'
function BreadcrumbsComponent() {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={`/${base}/home`}>
                Home
            </Link>
            <Typography color="text.primary">Delivery Packaging</Typography>
        </Breadcrumbs>
    )
}

export default BreadcrumbsComponent