var state = {}

state.a = [1, 2, 3]

function t(tab) {
  for (var i = 0; i < tab.length; i++) {
    tab[i]++
  }
}

t(state.a)

console.log(state.a)
