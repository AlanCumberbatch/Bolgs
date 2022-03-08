[reference link](https://mp.weixin.qq.com/s/cVadim-euH0nNnsqWk8TFw)<br/>

关于 WasmEdge：
- ✨ GitHub：https://github.com/WasmEdge/WasmEdge
- 💻 官网：https://wasmedge.org/
- 👨‍💻‍ Discord 群：https://discord.gg/JHxMj9EQbA
- 文档：https://wasmedge.org/book/en

### （简单的 Host Function）如何在一个Go程序里编写 Host Function

- rust 程序
  - Cargo.toml

    ```toml
      [package]
      name = "rust_host_func"
      version = "0.1.0"
      edition = "2021"

      [lib]
      crate-type = ["cdylib","rlib"]

      [dependencies]
    ```
  - lib.rs

    ```rs
      // add 函数被声明在  extern "C" 中， 这就是一个 Host Function。
      extern "C" {
        fn add(a: i32, b: i32) -> i32;
      }

      #[no_mangle]
      pub unsafe extern fn run() -> i32 {
        add(1,2)
      }
    ```
   - 将 Rust程序编译为 wasm： cargo build --target wasm32-wasi --release
   - 使用 wasm2wat 来查看 wasm 文件的导入段： wasm2wat target/wasm32-wasi/release/rust_host_func.wasm | grep import

     输出如下：
    ```wasm
      (import "env" "add" (func $add (type 0)))
    ```
    可以看到 add 函数被放到了默认名称为 env 的模块的导入段中。

- go 程序（即： 如何使用 WasmEdge-go SDK 来执行这段 wasm 程序）
  - hostfunc.go
  ```go
    package main

    import(
      "fmt"
      "os"

      "github.com/second-state/WasmEdge-go/wasmedge"
    )

    func add(_ interface{}, _ *wasmedge.Memory, params []interface{})([]interface{},wasmdege.Result){
      // 将从 wasm 传过来的两个参数做加法运算
      return []interface{}{params[0].(int32)+params[1].(int32)},wasmedge.Result_Success
    }

    func main(){
      vm :=
    }
  ```