protoc \
--plugin=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_out=./build  ./proto/*.proto \
--ts_proto_opt=nestJs=true \
--ts_proto_opt=fileSuffix=.pb
