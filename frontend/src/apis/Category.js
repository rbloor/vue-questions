import Api from "./Api"
import Csrf from "./Csrf"

export default {
  all() {
    return Api.get("/category")
  },

  find(id) {
    return Api.get(`/category/${id}`)
  },

  async create(form) {
    await Csrf.getCookie()
    return Api.post("/category", form)
  },

  async update(id, form) {
    await Csrf.getCookie()
    return Api.patch(`/category/${id}`, form)
  },

  async delete(id) {
    await Csrf.getCookie()
    return Api.delete(`/category/${id}`)
  }
}
