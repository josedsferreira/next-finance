export async function fetchBalances() {
    let data = await fetch('http://localhost:8080/api/balances')
    let balances = await data.json()
    return balances
  }