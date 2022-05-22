export default function ({route, redirect}) {
    if (!route.matched.length) {
        return redirect('/')
    }
}
