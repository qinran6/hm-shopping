import { getAddressList, addAddress, getArea, getAddressId, getAddressDetail } from '@/api/address'
export default {
  namespaced: true,
  state () {
    return {
      addressList: [],
      regionList: {},
      addressDetail: {}
    }
  },
  getters: {
  },
  mutations: {
    setAddressList (state, newList) {
      state.addressList = newList
    },
    setAreaList (state, newList) {
      state.regionList = newList
    },
    setAddressDetail (state, newDetail) {
      state.addressDetail = newDetail
    }
  },
  actions: {
    async getAddressListAction (context) {
      const res = await getAddressList()
      console.log(res)
      res.data.list = res.data.list.map(item => {
        return {
          id: item.address_id,
          name: item.name,
          tel: item.phone,
          address: item.region.province + item.region.city + item.region.region + item.detail,
          isDefault: false
        }
      })
      context.commit('setAddressList', res.data.list)
    },
    async getAddressDetailAction (context) {
      const res1 = await getAddressId()
      const id = res1.data.defaultId.toString()
      const res = await getAddressDetail(id)
      console.log(res.data.detail)
      context.commit('setAddressDetail', res.data.detail)
    },
    async getAreaAction (context) {
      const res = await getArea()
      console.log(res)
      const list = res.data.list
      const pList = {}
      const cList = {}
      const aList = {}
      for (const province in list) {
        pList[list[province].id] = list[province].name
        for (const city in list[province].city) {
          cList[list[province].city[city].id] = list[province].city[city].name
          for (const region in list[province].city[city].region) {
            aList[list[province].city[city].region[region].id] = list[province].city[city].region[region].name
          }
        }
      }
      console.log(pList, cList, aList)
      const newList = { province_list: pList, city_list: cList, county_list: aList }
      context.commit('setAreaList', newList)
    },
    async addAdressAction () {
      await addAddress('zs', '13107049085', [
        {
          value: 782,
          label: '上海'
        },
        {
          value: 783,
          label: '上海市'
        },
        {
          value: 784,
          label: '徐汇区'
        }
      ], '3号楼')
    }
  }
}
