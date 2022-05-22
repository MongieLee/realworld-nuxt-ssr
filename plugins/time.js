import Vue from 'vue'
import dayjs from 'dayjs'

export default function () {
    Vue.filter('time', function (value, format = 'YYYY-MM-DD HH:mm:ss') {
        return dayjs(value).format(format)
    })
}
