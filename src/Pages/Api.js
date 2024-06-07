import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Card, CardContent, Typography, Grid, TextField, AppBar, Toolbar, Box, Pagination } from '@mui/material'

const Api = () => {
  const [data, setData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const getdataApi = async () => {
    try {
      let response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      let api = response.data
      if (api) {
        setData(api)
        console.log(api)
      } else {
        console.log('Error in getting data')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getdataApi()
  }, [])

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1) // Reset to the first page on a new search
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value)
  }

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    item.body.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const pageCount = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My API Data
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            margin="normal"
            value={searchQuery}
            onChange={handleSearch}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
        </Toolbar>
      </AppBar>
      <h1>Go Bananas Assigment</h1>
      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={3}>
          {paginatedData.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Container>
    </Box>
  )
}

export default Api
