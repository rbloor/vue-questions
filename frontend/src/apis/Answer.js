import Api from "./Api"
import Csrf from "./Csrf"

export default {
  all() {
    return Api.get("/answer")
  },

  find(id) {
    return Api.get(`/answer/${id}`)
  },

  async create(form) {
    await Csrf.getCookie()
    return Api.post("/answer", form)
  },

  async update(id, form) {
    await Csrf.getCookie()
    return Api.patch(`/answer/${id}`, form)
  },

  async delete(id) {
    await Csrf.getCookie()
    return Api.delete(`/answer/${id}`)
  }
}
